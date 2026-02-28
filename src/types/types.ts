export interface Chat{
    id: string;
    title: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    role: "user"|"assistant";
    content: string;
    createdAt: string;
}