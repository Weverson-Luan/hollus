interface ICategories{
    id: string;
    link_foto: string;
    nome: string;
    descricao: string;
    foto: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    data: [
        {
            id: string;
            link_foto: string;
            nome: string;
            descricao: string;
            foto: string;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        }
    ]
}