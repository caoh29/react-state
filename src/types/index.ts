export type User = {
    id:      string;
    name:    string;
    photo:   string;
    resume:  string;
    company: {
        name: string;
        role: string;
    }
}