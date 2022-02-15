package br.com.turma.sgc.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoriaEnum {

    BACKEND(1, "Backend"),
    FRONTEND(2, "Frontend"),
    BANCO(3, "Banco"),
    ARQUITETURA(4, "Arquitetura"),
    METODOLOGIA(5, "Metodologia"),
    AGIL(6, "Ágil"),
    TESTES(7, "Testes"),
    DEVOPS(8, "Devops"),
    LIDERANCA(9, "Liderança");

    private Integer id;
    private String nome;

    public static CategoriaEnum pegaEnumPorId(Integer id){
        for(CategoriaEnum value : CategoriaEnum.values()){
            if(value.getId().equals(id)){
                return value;
            }
        }
        throw new IllegalArgumentException("Código não encontrado");
    }
}

