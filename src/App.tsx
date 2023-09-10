import { useState } from 'react';
import './App.css';
import { CreditRole, Credits, Title } from './types';
import { faker } from '@faker-js/faker';

const generateTitle = (correct = true) => {
    let releaseYear = faker.date
        .between({ from: '1900', to: '' + new Date().getFullYear() })
        .getFullYear();

    let countryCode = faker.location.countryCode('alpha-3');
    let ageCertification = faker.helpers.arrayElement([
        'G',
        'PG',
        'PG-13',
        'R',
        'NC-17',
        'U',
        'U/A',
        'A',
        'S',
        'AL',
        '6',
        '9',
        '12',
        '12A',
        '15',
        '18',
        '18R',
        'R18',
        'R21',
        'M',
        'MA15+',
        'R16',
        'R18+',
        'X18',
        'T',
        'E',
        'E10+',
        'EC',
        'C',
        'CA',
        'GP',
        'M/PG',
        'TV-Y',
        'TV-Y7',
        'TV-G',
        'TV-PG',
        'TV-14',
        'TV-MA',
    ]);

    // if invalid date - rewrite correct one with next values
    if (!correct) {
        releaseYear = faker.date.future().getFullYear();
        countryCode = faker.word.sample();
        ageCertification = faker.word.sample();
    }

    const title = {
        id: faker.number.int(),
        title: faker.music.songName(), //faker.company.catchPhrase(), // faker.word.sample(),
        description: faker.commerce.productDescription(),
        release_year: releaseYear,
        age_certification: ageCertification,
        runtime: faker.number.int({ min: 30, max: 240 }),
        genres: faker.helpers.arrayElements(
            [
                'Action',
                'Adventure',
                'Animated',
                'Comedy',
                'Drama',
                'Fantasy',
                'Historical',
                'Horror',
                'Musical',
                'Noir',
                'Romance',
                'Science fiction',
                'Thriller',
                'Western',
            ],
            { min: 1, max: 5 }
        ),
        production_country: countryCode,
        seasons: faker.number.int({
            min: 0,
            max: correct ? new Date().getFullYear() - releaseYear : 1000,
        }),
    };
    return title;
};

const generateCredits = (titleId: number, roleName?: CreditRole) => {
    const credits: Credits = {
        id: faker.number.int(),
        title_id: titleId,
        role:
            roleName ||
            faker.helpers.arrayElement([
                'Director',
                'Producer',
                'Screenwriter',
                'Actor',
                'Actress',
                'Cinematographer',
                'Film Editor',
                'Production Designer',
                'Costume Designer',
                'Music Composer',
            ]),
        real_name: faker.person.fullName(),
        character_name: faker.person.fullName(),
    };
    // console.log('credits: ', credits);
    return credits; /*?*/
};

const generateSet = (size = 111) => {
    const titlesDataSet = [];
    const creditsDataSet = [];
    for (let i = 0; i < size; i++) {
        const isCorrect = i % 3 !== 0; // 33% of invalid data
        titlesDataSet.push(generateTitle(isCorrect));
    }

    for (let title of titlesDataSet) {
        // console.log(title);
        const quantity = Math.ceil(Math.random() * 10 + 1);
        for (let i = 0; i < quantity; i++) {
            creditsDataSet.push(generateCredits(title.id));
        }
    }
    return { titlesDataSet, creditsDataSet };
};

function App() {
    const [titlesDataSet, setTitlesDataSet] = useState<any[]>([]);
    const [creditsDataSet, setCreditsDataSet] = useState<any>([]);

    const handleGeenrateClick = () => {
        console.log('start generation');
        // console.log(generateCredits(1));
        console.log(generateTitle(false));
        const dataSet = generateSet();
        setTitlesDataSet(dataSet.titlesDataSet);
        setCreditsDataSet(dataSet.creditsDataSet);
        console.log('end of generation');
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <button onClick={handleGeenrateClick}>Generate</button>

                <h3>Titles</h3>
                {titlesDataSet.length > 0 && (
                    <table>
                        <thead>
                            <th>id</th>
                            <th>title</th>
                            <th>description</th>
                            <th>release_year</th>
                            <th>age_certification</th>
                            <th>runtime</th>
                            <th>genres</th>
                            <th>production_country</th>
                            <th>seasons</th>
                            <th>is correct</th>
                        </thead>
                        <tbody>
                            {titlesDataSet.map((entry: Title) => (
                                <tr>
                                    {/* {Object.keys(entry).map((field: string) => (
                                        <td>{entry[field]}</td>
                                    ))} */}
                                    <td>{entry.id}</td>
                                    <td>{entry.title}</td>
                                    <td>{entry.description}</td>
                                    <td>{entry.release_year}</td>
                                    <td>{entry.age_certification}</td>
                                    <td>{entry.runtime}</td>
                                    <td>{entry.genres.join(', ')}</td>
                                    <td>{entry.production_country}</td>
                                    <td>{entry.seasons ?? 0}</td>
                                    <td>{entry.isCorrect ?? 'false'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <h3>Credits</h3>
            </header>
        </div>
    );
}

export default App;
