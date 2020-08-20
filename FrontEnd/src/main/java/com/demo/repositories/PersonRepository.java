package com.demo.repositories;

import com.demo.model.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Long> {

    @Override
    Iterable<Person> findAllById(Iterable<Long> iterable);


}
