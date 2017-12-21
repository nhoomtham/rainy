package com.rainy.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Rainy.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private Aws aws = new Aws();

    public Aws getAws() {return aws;}

    public void setAws(Aws aws) {this.aws = aws;}

    public static class Aws {

        private String accessKey;
        private String secretKey;
        private String region;
        private String rootDir;
        private String bucketName;

        public String getRegion() {
            return System.getenv(region);
        }

        public void setRegion(String region) {
            this.region = region;
        }

        public String getRootDir() {
            return rootDir;
        }

        public void setRootDir(String rootDir) {
            this.rootDir = rootDir;
        }


        public String getAccessKey() {
            return System.getenv(accessKey);
        }

        public void setAccessKey(String accessKey) {
            this.accessKey = accessKey;
        }

        public String getSecretKey() {
            return System.getenv(secretKey);
        }

        public void setSecretKey(String secretKey) {
            this.secretKey = secretKey;
        }

        @Override
        public String toString() {
            return "Aws{" +
                "Access Key=" + this.getAccessKey()  + " " +
                "Secret Key=" +System.getenv("AWS_SECRET_KEY")  + " " +
                '}';
        }

        public String getBucketName() {
            return bucketName;
        }

        public void setBucketName(String bucketName) {
            this.bucketName = bucketName;
        }
    }
}
