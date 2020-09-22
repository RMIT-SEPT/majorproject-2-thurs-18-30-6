package com.rmit.sept.thurs1830.group6.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class User {

    // User ID generated on creation
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User's name
    @Size(min = 3, max = 30, message = "Please enter 3 - 30 characters.")
    @NotBlank(message = "Name is required.")
    private String name;

    // User's email
    @NotBlank(message = "Email is required.")
    private String email;

    // User's username
    @Size(min = 3, max = 30, message = "Please enter 3 - 30 characters.")
    @NotBlank(message = "Username is required.")
    private String username;

    // User's phone number
    @NotBlank(message = "Phone Number is required.")
    private String phone_number;

    // User's home address
    @Size(min = 5, message = "Please enter more than 5 characters.")
    @NotBlank(message = "Home Address is required.")
    private String address;

    // User's password and confirmed password
    @Size(min = 8, message = "Password must be more than 8 characters long")
    @NotBlank(message = "Password is required")
    private String password;

    @Size(min = 8, message = "Confirmed Password must be more than 8 characters long")
    @NotBlank(message = "Confirmed Password is required")
    private String confirm_password;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date created_At;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;


    public User() {

    }


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirm_password() {
        return confirm_password;
    }

    public void setConfirm_password(String confirm_password) {
        this.confirm_password = confirm_password;
    }


    // Create and Update Dates
    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }
}
