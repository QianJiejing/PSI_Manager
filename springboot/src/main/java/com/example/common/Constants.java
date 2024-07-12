package com.example.common;

public interface Constants {

    String TOKEN = "token";

    // Token 过期时间，单位为毫秒
    int TOKEN_EXPIRATION_TIME = 2 * 60; // 120分钟，即2小时

    String USER_DEFAULT_PASSWORD = "123456";

    //图片上传路径
    String imageUploadEndpoint =  "http://localhost:9090/PsiAPI/files/";

}
