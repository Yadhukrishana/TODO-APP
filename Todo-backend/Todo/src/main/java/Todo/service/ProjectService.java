package Todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import Todo.model.Projects;
import Todo.repository.ProjectRepository;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Projects createProject(Projects project) {
        // Add any additional logic (e.g., setting created date)
        return projectRepository.save(project);
    }

public List<Projects> getAllProjects() {
    return projectRepository.findAll();
}

public Projects getProjectById(Long projectId) {
    return projectRepository.findById(projectId).orElse(null);
}
public Projects updateProjectTitle(Long projectId, String newTitle) {
    Projects existingProject = projectRepository.findById(projectId)
            .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));

    existingProject.setTitle(newTitle); // Update the title
    return projectRepository.save(existingProject);
}

}