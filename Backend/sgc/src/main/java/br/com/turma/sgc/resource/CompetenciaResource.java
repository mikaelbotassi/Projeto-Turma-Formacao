package br.com.turma.sgc.resource;

import br.com.turma.sgc.service.dto.CompetenciaDTO;
import br.com.turma.sgc.service.CompetenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/competencia")
public class CompetenciaResource {
    @Autowired
    CompetenciaService competenciaService;

    @GetMapping()
    public ResponseEntity<List<CompetenciaDTO>> procurarTodos(){
        return ResponseEntity.ok().body(competenciaService.procurarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompetenciaDTO> procurarPorId(@Valid @PathVariable Integer id){
        return ResponseEntity.ok().body(competenciaService.procurarPorId(id));
    }

    @PostMapping
    public ResponseEntity<CompetenciaDTO> inserir(@Valid @RequestBody CompetenciaDTO competenciaDTO) {
        return ResponseEntity.ok().body(competenciaService.inserir(competenciaDTO));
    }

    @PutMapping
    public ResponseEntity<CompetenciaDTO> atualizar(@Valid @RequestBody CompetenciaDTO competenciaDTO) {
        return ResponseEntity.ok().body(competenciaService.atualizar(competenciaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@Valid @PathVariable Integer id){
        competenciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/colaborador/{idColaborador}/nivel/{idNivel}")
    public ResponseEntity<List<CompetenciaDTO>> buscarCompetenciasMaximasPorIdColaborador(@PathVariable Integer idColaborador, @PathVariable Integer idNivel){
        List<CompetenciaDTO> dto = competenciaService.buscarCompetenciasPorNivelEPorIdColaborador(idColaborador, idNivel);
        return ResponseEntity.ok().body(dto);
    }
}
