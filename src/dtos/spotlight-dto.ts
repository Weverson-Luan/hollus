export interface ISpotlight {
    terapeutas: [
        {
            id: string;
            nome: string;
            pont: string;
            nota_media: number;
            date_scheduling: string;
            hors: string;
            espaco: string;
            image_therapies: string;
        },
    ];
    destaques: [
        {
            id: string;
            nome: string;
            pont: string;
            nota_media: number;
            date_scheduling: string;
            hors: string;
            espaco: string;
            image_therapies: string;
        },
    ];
    espacos: [
        {
            id: string;
            nome: string;
            pont: string;
            nome_fantasia: string;
            link_logo: string;
            date_scheduling: string;
            hors: string;
            space: string;
            image_therapies: string;
        },
    ];
}