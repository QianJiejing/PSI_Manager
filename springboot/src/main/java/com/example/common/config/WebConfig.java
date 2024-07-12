package com.example.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class WebConfig implements  WebMvcConfigurer {

    @Resource
    private JwtInterceptor jwtInterceptor;

    //指定controller统一的接口前缀，相当于：在urL上拼了一个/api/xxx
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer){

        configurer.addPathPrefix( "/PsiAPI",clazz ->clazz.isAnnotationPresent(RestController.class));

    }

    // 加自定义拦截器JwtInterceptor，设置拦截规则
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/PsiAPI/**")
                .excludePathPatterns("/PsiAPI")
                .excludePathPatterns("/PsiAPI/login")
                .excludePathPatterns("/PsiAPI/register")
                .excludePathPatterns("/PsiAPI/getValidateCode")
                .excludePathPatterns("/PsiAPI/files/**")
                .excludePathPatterns("/PsiAPI/supplier/export")
                .excludePathPatterns("/PsiAPI/customer/export")
                .excludePathPatterns("/PsiAPI/goods/export")
                .excludePathPatterns("/PsiAPI/supermarket")

        ;

    }
}