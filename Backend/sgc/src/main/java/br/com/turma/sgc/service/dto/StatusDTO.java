package br.com.turma.sgc.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class StatusDTO implements Serializable {
    private Integer id;
    private String descricao;
}
