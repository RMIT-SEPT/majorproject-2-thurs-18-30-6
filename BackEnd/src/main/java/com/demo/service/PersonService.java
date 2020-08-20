package com.demo.service;

import com.demo.model.Person;
import com.demo.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person savedOrUpdatedPerson(Person person){

        //business logic

        return personRepository.save(person);
    }
}
