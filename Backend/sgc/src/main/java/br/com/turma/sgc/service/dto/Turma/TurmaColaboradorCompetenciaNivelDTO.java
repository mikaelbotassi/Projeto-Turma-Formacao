package br.com.turma.sgc.service.dto.Turma;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class TurmaColaboradorCompetenciaNivelDTO implements Serializable {

    private Integer colaboradorId;

    private String colaboradorNome;

    private String colaboradorSobrenome;

    private String competenciaNome;

    private Integer nivel;

    private Integer competenciaId;


}
