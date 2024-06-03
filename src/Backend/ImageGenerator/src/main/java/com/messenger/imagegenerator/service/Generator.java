package com.messenger.imagegenerator.service;

import com.messenger.imagegenerator.sd4j.SD4J;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.io.*;
import java.util.List;
import java.util.Optional;

@Component
public class Generator {
    private Optional<SD4J.SD4JConfig> config;

    private SD4J sd;

    @Scheduled(fixedRate = 50)
    public StreamingResponseBody getImage(String q) {

        int seed = Math.random();
        List<SD4J.SDImage> images = getSd().generateImage(5, q, "", 7.5f, 1, new SD4J.ImageSize(64, 64), seed);

        return os -> {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(images.get(0).image(), "png", bos);
            readAndWrite(new ByteArrayInputStream(bos.toByteArray()), os);
        };
    }

    private void readAndWrite(final InputStream is, OutputStream os)
            throws IOException {
        byte[] data = new byte[2048];
        int read = 0;
        while ((read = is.read(data)) > 0) {
            os.write(data, 0, read);
        }
        os.flush();
    }

    @Override
    public void run(String... args) throws Exception {
        config = SD4J.SD4JConfig.parseArgs(args);

        sd = SD4J.factory(config.get());
    }

    private SD4J getSd() {
        if (sd == null) {
            sd = SD4J.factory(config.get());
        }
        return sd;
    }
}
