package Todo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Todo.model.Projects;
import Todo.repository.ProjectRepository;
import Todo.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*", allowedHeaders = "*") // Allow requests from all origins with all headers
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/create")
    public ResponseEntity<Projects> createProject(@RequestBody Projects project) {
        Projects createdProject = projectService.createProject(project);
        return ResponseEntity.ok(createdProject);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Projects>> getAllProjects() {
        List<Projects> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Projects> getProjectById(@PathVariable Long projectId) {
        Projects project = projectService.getProjectById(projectId);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{projectId}/updateTitle")
    public ResponseEntity<Projects> updateProjectTitle(@PathVariable Long projectId, @RequestBody String newTitle) {
        Projects project = projectService.updateProjectTitle(projectId, newTitle);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
