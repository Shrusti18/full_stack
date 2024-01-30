package Task1.repo;

import Task1.entity.Marks;


import org.springframework.data.jpa.repository.JpaRepository;

public interface Marksrepo extends JpaRepository<Marks, Integer> {


}