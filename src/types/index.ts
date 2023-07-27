export type User = {
    name:    string;
    photo:   string;
    resume:  string;
    company: {
        name: string;
        role: string;
    }
}