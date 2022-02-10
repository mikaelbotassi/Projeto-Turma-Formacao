package br.com.turma.sgc.service.dto;

import br.com.turma.sgc.domain.Senioridade;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
public class ColaboradorDTO implements Serializable {

    private Integer id;

    private String nomeColaborador;

    private String sobrenomeColaborador;

    private String cpf;

    private byte[] foto;

    private String email;

    private LocalDate dataNascimento;

    private LocalDate dataAdmissao;

    private String nomeSenioridade;

    private Integer idSenioridade;

}
