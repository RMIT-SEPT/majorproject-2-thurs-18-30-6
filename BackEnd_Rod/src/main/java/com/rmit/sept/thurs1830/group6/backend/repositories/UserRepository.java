package com.rmit.sept.thurs1830.group6.backend.repositories;

import com.rmit.sept.thurs1830.group6.backend.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);
}
