package br.com.turma.sgc.domain;

import br.com.turma.sgc.enums.SenioridadeEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "colaborador")
public class Colaborador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_COLAB")
    @SequenceGenerator(name = "SQ_COLAB", sequenceName = "sq_colaborador", initialValue = 2, allocationSize = 1)
    private int id;

    @Column(name = "nome_colaborador")
    private String nomeColaborador;

    @Column(name = "sobrenome_colaborador")
    private String sobrenomeColaborador;

    @Column(name = "cpf")
    private String cpf;

    @Lob
    @Column(name = "foto")
    private byte[] foto;

    @Column(name = "email")
    private String email;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "data_admissao")
    private LocalDate dataAdmissao;

    @Enumerated(EnumType.ORDINAL)
    private SenioridadeEnum senioridade;
}
