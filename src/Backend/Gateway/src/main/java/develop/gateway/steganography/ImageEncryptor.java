package develop.gateway.steganography;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class ImageEncryptor {
    private static final int BLOCK_SIZE = 1024;

    public static BufferedImage readImage(byte[] imgBuffer) {
        try {
            var image = ImageIO.read(new ByteArrayInputStream(imgBuffer));
            return image;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static List<BufferedImage> encodeMessage(String message) {
        int cursor = 0;
        var bytes = message.getBytes(StandardCharsets.UTF_8);
        List<BufferedImage> images = new LinkedList<>();

        do {
            var image = readImage(bytes); //TODO: change bytes

            assert image != null;
            encodeMessage(image, Arrays.copyOfRange(bytes, cursor, cursor + BLOCK_SIZE));

            images.add(image);

            cursor += Math.min(bytes.length - cursor, BLOCK_SIZE);
        } while (cursor < bytes.length);

        return images;
    }

    public static String decodeMessage(BufferedImage[] images) {
        var message = new StringBuilder();
        for (var image: images) {
            message.append(new String(decodeMessage(image), StandardCharsets.UTF_8));
        }
        return message.toString();
    }


    public static byte[] decodeMessage(BufferedImage coverImage) {
        int messageLength = 0;
        for (int j = 0; j < 16; j++) {
            int pixel = coverImage.getRGB(0, j);
            int blue = pixel & 0xFF;

            int blueLSB = blue & 0x03;

            messageLength |= blueLSB;
            messageLength <<= 2;
        }
        int quartets = messageLength >> 2;
        var result = new byte[quartets >> 2];
        var resultIndex = 0;
        var shouldSwitchByte = false;

        for (int i = 0; i < coverImage.getWidth(); i++) {
            int linesElapsed = i * coverImage.getHeight();
            for (int j = 0; j < coverImage.getHeight(); j++) {
                if (linesElapsed + j > quartets) {
                    return result;
                }

                int pixel = coverImage.getRGB(i, j);
                int red = (pixel >> 16) & 0xFF;
                int green = (pixel >> 8) & 0xFF;

                // Extract the least significant bits
                int redLSB = red & 0x03;
                int greenLSB = green & 0x03;

                // Combine the LSBs to form a bit
                int combinedLSB = (greenLSB << 2) | redLSB;

                // Append the bit to the message
                result[resultIndex] |= (byte) combinedLSB;

                if (shouldSwitchByte) {
                    resultIndex++;
                }

                shouldSwitchByte = !shouldSwitchByte;
            }
        }

        return result;
    }


    /**
     *
     * @param coverImage is a 14kb image where the data will be hidden
     * @param messageBytes is a message with block size or less
     */
    public static void encodeMessage(BufferedImage coverImage, byte[] messageBytes) {
        int messageLength = messageBytes.length * 8;
        int quartets = messageLength / 4;

        int messageByteIndex = 0;
        var shouldSwitchByte = false;

        int messageBitLengthLeft = 32;

        for (int i = 0; i < coverImage.getWidth(); i++) {
            int linesElapsed = i * coverImage.getHeight();
            for (int j = 0; j < coverImage.getHeight(); j++) {
                if (linesElapsed + j > quartets && messageBitLengthLeft < 0) {
                    return;
                }
                int pixel = coverImage.getRGB(i, j);
                int red = (pixel >> 16) & 0xFF;
                int green = (pixel >> 8) & 0xFF;
                int blue = pixel & 0xFF;

                // Modify the least significant bits of red, green, and blue
                // This is a simplified example; you'll need to adjust it based on your message length
                if (messageByteIndex < messageBytes.length) {
                    red = (red & 0xFD) | (messageBytes[messageByteIndex] & 0x03);
                    green = (green & 0xFD) | ((messageBytes[messageByteIndex] >> 2) & 0x03);
                    messageBytes[messageByteIndex] >>= 4;
                }
                if ((messageBitLengthLeft -= 2) >= 0) {
                    blue = (blue & 0xFD) | (messageLength & 0x02);
                    messageLength >>= 2;
                }

                if (shouldSwitchByte) {
                    messageByteIndex++;
                }

                shouldSwitchByte = !shouldSwitchByte;

                coverImage.setRGB(i, j, (red << 16) | (green << 8) | blue);
            }
        }
    }

    public static void saveImage(BufferedImage coverImage, String filename) {
        try {
            ImageIO.write(coverImage, "jpg", new File(filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
