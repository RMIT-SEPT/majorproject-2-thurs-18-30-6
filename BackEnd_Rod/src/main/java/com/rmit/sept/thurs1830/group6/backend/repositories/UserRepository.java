package com.rmit.sept.thurs1830.group6.backend.repositories;

import com.rmit.sept.thurs1830.group6.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    // I HAVE NO IDEA
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);


    // LOGIN QUERY
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.password = ?2")
    User findByEmailAndPassword(String email, String password);
}
