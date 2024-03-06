package mess.messagecontrolservice.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "file_info")
public class FileInfo extends BaseEntity {
    private String fileName;
    private String filePath;
    private int size;
}
