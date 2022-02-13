package br.com.turma.sgc.resource;
import br.com.turma.sgc.service.ColaboradorService;
import br.com.turma.sgc.service.dto.ColaboradorBuscaDTO;
import br.com.turma.sgc.service.dto.ColaboradorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@Transactional
@RestController
@RequestMapping("/api/colaborador")
@RequiredArgsConstructor
public class ColaboradorResource {

    private final ColaboradorService service;

    @GetMapping
    public ResponseEntity<List<ColaboradorBuscaDTO>> procurarTodos(){
        return ResponseEntity.ok().body(service.procurarTodos());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ColaboradorDTO> procurarPorId(@PathVariable int id){
        return ResponseEntity.ok().body(service.procurarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ColaboradorDTO> inserir(@RequestBody @Valid ColaboradorDTO colab){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.inserir(colab));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id){
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<ColaboradorDTO> atualizar(@RequestBody ColaboradorDTO c){
        return ResponseEntity.ok().body(service.atualizar(c));
    }

//    @GetMapping("/aplicarCategoria/{competencia}")
//    public ResponseEntity<List<Colaborador>> buscarColaboradorPraAplicarCompetecia(@PathVariable String competencia) {
//        return ResponseEntity.ok().body(service.buscarColaboradorPraAplicarCompetecia(competencia));
//    }
//
//    @GetMapping("/aplicarCategoria/{id}")
//    public ResponseEntity<List<Integer>> buscarColaboradorAplicarCompeteciaID(@PathVariable Integer id) {
//        return ResponseEntity.ok().body(service.buscarColaboradorAplicarCompeteciaID(id));
//    }
}
