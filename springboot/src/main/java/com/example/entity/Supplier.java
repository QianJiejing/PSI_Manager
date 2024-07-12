package com.example.entity;

import cn.hutool.core.annotation.Alias;

import java.io.Serializable;

/**
 * 供应商表
*/
public class Supplier implements Serializable {
    private static final long serialVersionUID = 1L;
    @Alias("ID")
    /** ID */
    private Integer id;
    @Alias("供应商名称")
    /** 供应商名称 */
    private String name;
    @Alias("供应商地址")
    /** 供应商地址 */
    private String address;
    @Alias("供应商电话")
    /** 供应商电话 */
    private String tel;
    @Alias("供应商邮箱")
    /** 供应商邮箱 */
    private String email;
    @Alias("邮编")
    /** 邮编 */
    private String zipCode;
    @Alias("联系人")
    /** 联系人 */
    private String user;
    @Alias("联系人电话")
    /** 联系人电话 */
    private String phone;
    @Alias("开户银行")
    /** 开户银行 */
    private String bank;
    @Alias("开户行账号")
    /** 开户行账号 */
    private String bankCard;
    @Alias("状态")
    /** 状态 */
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getBankCard() {
        return bankCard;
    }

    public void setBankCard(String bankCard) {
        this.bankCard = bankCard;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}