package Todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Todo.model.Projects;

public interface ProjectRepository extends JpaRepository<Projects, Long>{

}
