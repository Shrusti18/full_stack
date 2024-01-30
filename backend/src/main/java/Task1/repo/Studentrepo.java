package Task1.repo;

import Task1.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Studentrepo extends JpaRepository<Student, Integer> {


}
