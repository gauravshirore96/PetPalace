package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Integer id) {
        return roleRepository.findById(id);
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(Integer id, Role roleDetails) {
        return roleRepository.findById(id)
                .map(role -> {
                    role.setRoleName(roleDetails.getRoleName());
                    return roleRepository.save(role);
                })
                .orElseThrow(() -> new RuntimeException("Role not found with id " + id));
    }

    public void deleteRole(Integer id) {
        roleRepository.deleteById(id);
    }
}

