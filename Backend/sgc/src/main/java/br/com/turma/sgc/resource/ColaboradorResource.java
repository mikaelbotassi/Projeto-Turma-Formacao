package br.com.turma.sgc.resource;

import br.com.turma.sgc.domain.Colaborador;
import br.com.turma.sgc.service.ColaboradorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RestController
@RequestMapping("/api/colaborador")
@RequiredArgsConstructor
public class ColaboradorResource {

    private final ColaboradorService service;

    @GetMapping
    public ResponseEntity<List<Colaborador>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Colaborador> findById(@PathVariable int id){
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Colaborador> insert(@RequestBody Colaborador colab){
        return ResponseEntity.ok().body(service.insert(colab));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Colaborador> update(@RequestBody Colaborador c){
        return ResponseEntity.ok().body(service.update(c));
    }

}
