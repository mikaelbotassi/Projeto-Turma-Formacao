package br.com.turma.sgc.resource;

import br.com.turma.sgc.domain.TurmaColaboradorCompetencia;
import br.com.turma.sgc.domain.pk.TurmaColaboradorCompetenciaPK;
import br.com.turma.sgc.service.TurmaColaboradorCompetenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/disciplinas")
public class TurmaColaboradorCompetenciaResource {

    private final TurmaColaboradorCompetenciaService service;


    @GetMapping
    public ResponseEntity<List<TurmaColaboradorCompetencia>> procurarTodos(){
        return service.procurarTodos();
    }

    @GetMapping(value = "/turma-{idTurma}/colaborador-{idColaborador}/competencia-{idCompetencia}")
    public ResponseEntity<TurmaColaboradorCompetencia> procurarPorId(@PathVariable int idTurma,
                                                                     @PathVariable int idColaborador, @PathVariable int idCompetencia){
        return ResponseEntity.ok().body(service.procurarPorId(idTurma, idColaborador, idCompetencia));
    }

    @PostMapping
    public TurmaColaboradorCompetencia inserir(@RequestBody TurmaColaboradorCompetenciaPK turmaColaboradorCompetenciaPK){
        return service.inserir(turmaColaboradorCompetenciaPK);
    }

    @DeleteMapping(value = "/turma/{idTurma}/colaborador/{idColaborador}/competencia/{idCompetencia}")
    public ResponseEntity<Void> deletar(@PathVariable int idTurma, @PathVariable int idColaborador, @PathVariable int idCompetencia){
        service.deletar(idTurma, idColaborador, idCompetencia);
        return ResponseEntity.noContent().build();
    }

}
