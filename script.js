/* =========================================
   REVISTA DIGITAL - EFEITO FLIP
========================================= */

const folhas =
    document.querySelectorAll(".folha");

const botaoAnterior =
    document.getElementById("anterior");

const botaoProximo =
    document.getElementById("proximo");

const contador =
    document.getElementById("paginaAtual");

const botoesMenu =
    document.querySelectorAll(".menu button");


let paginaAtual = 0;


/* =========================================
   ATUALIZA CONTADOR
========================================= */

function atualizarContador() {

    contador.textContent =
        `${paginaAtual + 1} / ${folhas.length}`;

}


/* =========================================
   ATUALIZA Z-INDEX
========================================= */

function atualizarCamadas() {

    folhas.forEach(
        (folha, indice) => {

            if (
                folha.classList.contains("virada")
            ) {

                folha.style.zIndex =
                    indice + 1;

            } else {

                folha.style.zIndex =
                    folhas.length - indice;

            }

        }
    );

}


/* =========================================
   VIRAR PÁGINA
========================================= */

function proximaPagina() {

    if (
        paginaAtual >= folhas.length
    ) {
        return;
    }

    folhas[paginaAtual]
        .classList
        .add("virada");

    paginaAtual++;

    atualizarCamadas();

    atualizarContador();

}


/* =========================================
   VOLTAR PÁGINA
========================================= */

function paginaAnterior() {

    if (paginaAtual <= 0) {
        return;
    }

    paginaAtual--;

    folhas[paginaAtual]
        .classList
        .remove("virada");

    atualizarCamadas();

    atualizarContador();

}


/* =========================================
   BOTÃO PRÓXIMO
========================================= */

botaoProximo.addEventListener(
    "click",
    function () {

        proximaPagina();

    }
);


/* =========================================
   BOTÃO ANTERIOR
========================================= */

botaoAnterior.addEventListener(
    "click",
    function () {

        paginaAnterior();

    }
);


/* =========================================
   CLIQUE NA PÁGINA
========================================= */

folhas.forEach(
    (folha) => {

        folha.addEventListener(
            "click",
            function (evento) {

                /*
                 * Se clicar no lado direito,
                 * vira a página.
                 */

                const largura =
                    folha.offsetWidth;

                const posicao =
                    evento.offsetX;


                if (
                    posicao >
                    largura / 2
                ) {

                    /*
                     * Só permite virar
                     * a folha que está
                     * atualmente aberta.
                     */

                    const indice =
                        Number(
                            folha.dataset.page
                        );


                    if (
                        indice === paginaAtual
                    ) {

                        proximaPagina();

                    }

                } else {

                    /*
                     * Clique no lado esquerdo
                     * volta uma página.
                     */

                    const indice =
                        Number(
                            folha.dataset.page
                        );


                    if (
                        indice === paginaAtual - 1
                    ) {

                        paginaAnterior();

                    }

                }

            }
        );

    }
);


/* =========================================
   MENU
========================================= */

botoesMenu.forEach(
    (botao) => {

        botao.addEventListener(
            "click",
            function () {

                const destino =
                    Number(
                        botao.dataset.page
                    );

                irParaPagina(destino);

            }
        );

    }
);


/* =========================================
   IR PARA UMA PÁGINA
========================================= */

function irParaPagina(destino) {

    if (
        destino < 0 ||
        destino >= folhas.length
    ) {

        return;

    }


    /*
     * Volta tudo ao estado inicial.
     */

    folhas.forEach(
        (folha) => {

            folha.classList.remove(
                "virada"
            );

        }
    );


    /*
     * Vira as folhas anteriores.
     */

    for (
        let i = 0;
        i < destino;
        i++
    ) {

        folhas[i]
            .classList
            .add("virada");

    }


    paginaAtual = destino;

    atualizarCamadas();

    atualizarContador();

}


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "ArrowRight"
        ) {

            proximaPagina();

        }


        if (
            evento.key === "ArrowLeft"
        ) {

            paginaAnterior();

        }

    }
);


/* =========================================
   DESLIZAR NO CELULAR
========================================= */

let toqueInicial = 0;

let toqueFinal = 0;


document.addEventListener(
    "touchstart",
    function (evento) {

        toqueInicial =
            evento.changedTouches[0]
                .screenX;

    }
);


document.addEventListener(
    "touchend",
    function (evento) {

        toqueFinal =
            evento.changedTouches[0]
                .screenX;


        const distancia =
            toqueFinal -
            toqueInicial;


        /*
         * Deslizar para esquerda
         */

        if (
            distancia < -60
        ) {

            proximaPagina();

        }


        /*
         * Deslizar para direita
         */

        if (
            distancia > 60
        ) {

            paginaAnterior();

        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

atualizarCamadas();

atualizarContador();