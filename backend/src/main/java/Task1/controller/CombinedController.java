package Task1.controller;

import Task1.entity.Marks;
import Task1.entity.Studdetials;
import Task1.entity.Student;
import Task1.exception.ResourceNotFoundException;
import Task1.repo.Marksrepo;
import Task1.repo.Studentdetrepo;
import Task1.repo.Studentrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://ec2-13-127-25-66.ap-south-1.compute.amazonaws.com")
//@CrossOrigin("*")
@RequestMapping("/api/s/")

public class CombinedController {
    @Autowired
    private Studentrepo studentrepo;

    @Autowired
    private Studentdetrepo studentdetrepo;

    @Autowired
    private Marksrepo marksrepo;

    @PostMapping("/creatstudent")
    public ResponseEntity<?> createEntities(@RequestBody Map<String, Object> requestData) {
        try {

            Map<String, Object> studdetialsData = (Map<String, Object>) requestData.get("studdetials");
            String address = (String) studdetialsData.get("address");
            String gender = (String) studdetialsData.get("gender");
            String emailId = (String) studdetialsData.get("emailid");


            Studdetials studdetials = new Studdetials();
            studdetials.setAddress(address);
            studdetials.setGender(gender);
            studdetials.setEmailid(emailId);


            Studdetials savedStuddetials = studentdetrepo.save(studdetials);


            Map<String, Object> studentData = (Map<String, Object>) requestData.get("student");
            String firstName = (String) studentData.get("firstname");
            String lastName = (String) studentData.get("lastname");


            Student student = new Student();
            student.setFirstname(firstName);
            student.setLastname(lastName);
            student.setStuddetials(savedStuddetials);


            Map<String, Object> marksData = (Map<String, Object>) requestData.get("marks");
            String subject = (String) marksData.get("subject");
            Float marks = Float.parseFloat(marksData.get("marks").toString());


            Marks marksEntity = new Marks();
            marksEntity.setSubject(subject);
            marksEntity.setMarks(marks);


            student.setMarks(marksEntity);


            studentrepo.save(student);

            return ResponseEntity.ok("Entities created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating entities: " + e.getMessage());
        }


    }

    @GetMapping("/getallstudent")
    public Map<String, Object> getCombinedData() {
        Map<String, Object> combinedData = new HashMap<>();
        combinedData.put("student", this.studentrepo.findAll());
        combinedData.put("studentDetails", this.studentdetrepo.findAll());
        combinedData.put("marks", this.marksrepo.findAll());
        return combinedData;
    }

    @GetMapping("/getstudent/{id}")
    public ResponseEntity<Student> GetById0(@PathVariable("id") Integer id)
            throws ResourceNotFoundException {
        Student student = studentrepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found for this id " + id));
        return ResponseEntity.ok().body(student);
    }


    @DeleteMapping("/deletestudent/{id}")
    public Map<String, Boolean> deleteStudent(@PathVariable Integer id) throws ResourceNotFoundException {
        Map<String, Boolean> response = new HashMap<>();
        System.out.println(response);
        boolean isDeleted = false;

        Student student = studentrepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found for this id " + id));
        studentrepo.delete(student);
        isDeleted = true;

        response.put("delete", isDeleted);
        return response;
    }

//1. Register in Dockerhub
//2. Create AWS freetier account - ec2 instance & RDS (only free tier)
//3. Create a Dockerfile - frontend & Backend
//4. Run F.E & B.E through dockercommand
//5. Push image to docker repository.
//6. Pull Image to ec2 Instance and run.




    @PutMapping("/updatestudent/{id}")
    public ResponseEntity<?> updateEntities(@PathVariable("id") Integer id, @RequestBody Map<String, Object> requestData) {
        try {
            Optional<Student> studentOptional = studentrepo.findById(id);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();

                Map<String, Object> studentData = (Map<String, Object>) requestData.get("student");
                if (studentData != null) {
                    String firstName = (String) studentData.get("firstname");
                    String lastName = (String) studentData.get("lastname");

                    if (!StringUtils.isEmpty(firstName)) {
                        student.setFirstname(firstName);
                    }
                    if (!StringUtils.isEmpty(lastName)) {
                        student.setLastname(lastName);
                    }
                }

                Map<String, Object> studdetialsData = (Map<String, Object>) requestData.get("studdetials");
                if (studdetialsData != null) {
                    Studdetials studdetials = student.getStuddetials();
                    String address = (String) studdetialsData.get("address");
                    String gender = (String) studdetialsData.get("gender");
                    String emailId = (String) studdetialsData.get("emailid");

                    if (!StringUtils.isEmpty(address)) {
                        studdetials.setAddress(address);
                    }
                    if (!StringUtils.isEmpty(gender)) {
                        studdetials.setGender(gender);
                    }
                    if (!StringUtils.isEmpty(emailId)) {
                        studdetials.setEmailid(emailId);
                    }
                }

                Map<String, Object> marksData = (Map<String, Object>) requestData.get("marks");
                if (marksData != null) {
                    Marks marks = student.getMarks();
                    String subject = (String) marksData.get("subject");
                    Float marksValue = Float.parseFloat(marksData.get("marks").toString());

                    if (!StringUtils.isEmpty(subject)) {
                        marks.setSubject(subject);
                    }
                    if (marksValue != null) {
                        marks.setMarks(marksValue);
                    }
                }

                studentrepo.save(student);


                return ResponseEntity.ok("Student details updated successfully!");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating student details: " + e.getMessage());
        }
    }
}
