package br.com.turma.sgc.resource;

import br.com.turma.sgc.service.StatusService;
import br.com.turma.sgc.service.dto.StatusDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("api/status")
@RestController
@RequiredArgsConstructor
public class StatusResource {

    private final StatusService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<StatusDTO> buscarStatusPorId(@PathVariable Integer id){
        return ResponseEntity.ok().body(service.buscarStatusPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<StatusDTO>> listarTodosStatus(){
        return ResponseEntity.ok().body(service.listarTodosStatus());
    }



}
