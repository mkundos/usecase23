export interface Title {
    id: number;
    title: string;
    description: string;
    release_year: number; //  should have a Common Era year format
    age_certification:
        | 'G'
        | 'PG'
        | 'PG-13'
        | 'R'
        | 'NC-17'
        | 'U'
        | 'U/A'
        | 'A'
        | 'S'
        | 'AL'
        | '6'
        | '9'
        | '12'
        | '12A'
        | '15'
        | '18'
        | '18R'
        | 'R18'
        | 'R21'
        | 'M'
        | 'MA15+'
        | 'R16'
        | 'R18+'
        | 'X18'
        | 'T'
        | 'E'
        | 'E10+'
        | 'EC'
        | 'C'
        | 'CA'
        | 'GP'
        | 'M/PG'
        | 'TV-Y'
        | 'TV-Y7'
        | 'TV-G'
        | 'TV-PG'
        | 'TV-14'
        | 'TV-MA';
    runtime: number; //should be a common title duration in minutes
    genres: string[]; // should contain a list of strings representing various movie (series) genres
    production_country: string; // should represent a country in ISO 3166-1 Alpha-3 code
    seasons?: number; // should represent the number of seasons for series or be empty for movies
    isCorrect?: boolean;
}

export type CreditRole =
    | 'Director'
    | 'Producer'
    | 'Screenwriter'
    | 'Actor'
    | 'Actress'
    | 'Cinematographer'
    | 'Film Editor'
    | 'Production Designer'
    | 'Costume Designer'
    | 'Music Composer';

export interface Credits {
    id: number; // numeric credits identifier
    title_id: number; // corresponding title id
    real_name: string; //full credits member name
    character_name: string; // corresponding movie (series) character name
    role: CreditRole;
}
/*
•	The generated test data should cover a wide range of scenarios" | "including positive" | "negative" | "and edge cases, to ensure comprehensive testing of the application's functionality.
•	The test data should accurately represent the expected input and output data types, formats, and values, ensuring that it is suitable for validating the application's functionality.
•	The test data should be diverse and include different combinations of inputs, ensuring that the application is tested against a variety of scenarios.

}
*/
