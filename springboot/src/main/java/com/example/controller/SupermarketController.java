package com.example.controller;


import com.example.common.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 超市相关接口
 **/
@RestController
@RequestMapping("/supermarket")
public class SupermarketController {

    public static final String BUSINESS_STATUS_KEY = "MARKET_STATUS";

    private static final Logger log = LoggerFactory.getLogger(SupermarketController.class);
    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    /**
     * 设置超市营业状态
     */
    @PostMapping("/setStatus/{status}")
    public Result setStatus(@PathVariable Integer status){
        log.info("设置超市的营业状态：{}",status == 1 ? "营业中":"打烊中");
        redisTemplate.opsForValue().set(BUSINESS_STATUS_KEY, status);

        return Result.success();
    }
    /**
     * 获取超市营业状态
     */
    @GetMapping("/getStatus")
    public Result getStatus(){
        Integer status = (Integer) redisTemplate.opsForValue().get(BUSINESS_STATUS_KEY);
        log.info("获取到的超市的营业状态：{}",status == 1 ? "营业中":"打烊中");
        return Result.success(status);
    }

}
