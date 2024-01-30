package Task1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Studentinfo")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @Column(name = "First_name")
    public String firstname;
    @Column(name = "Last_name")
    public String lastname;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_rollid")
    public Studdetials studdetials;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_markid")
    public Marks marks;

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setStuddetials(Studdetials studdetials) {
        this.studdetials = studdetials;
    }
    public void setMarks(Marks marks) {
        this.marks=marks;
    }



    public String getFirstname() {
        this.firstname=firstname;
        return firstname;
    }

    public String getLastname() {
        this.lastname=lastname;
        return lastname;
    }

    public Studdetials getStuddetials() {
        return studdetials;
    }


}
