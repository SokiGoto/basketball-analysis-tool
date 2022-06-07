export type LoginState = "signin" | "signout" | "";

export type LoginInfo = {
	state: LoginState;
	userid: string;
	email: string;
};

export type Point = {
    coor_x: number;
    coor_y: number;
    color: string;
    point: number;
};

export type Parameter = {
    foul_A: number;
    foul_B: number;
    assist_A: number;
    assist_B: number;
    steal_A: number;
    steal_B: number;
    ft_SA: number;
    ft_FA: number;
    ft_SB: number;
    ft_FB: number;
    rebound_OA: number;
    rebound_DA: number;
    rebound_OB: number;
    rebound_DB: number;
    bs_A: number;
    bs_B: number;
    to_A: number;
    to_B: number;
}

export type Quarter = {
    point: Point[];
    parameter: Parameter;
}

export type Game = {
    year: number;
    month: number;
    day: number;
    team_A?: string;
    team_B?: string;
    Q1: Quarter;
    Q2: Quarter;
    Q3: Quarter;
    Q4: Quarter;
}


export const InitialParameter = {
    foul_A: 0,
    foul_B: 0,
    assist_A: 0,
    assist_B: 0,
    steal_A: 0,
    steal_B: 0,
    ft_SA: 0,
    ft_FA: 0,
    ft_SB: 0,
    ft_FB: 0,
    rebound_OA: 0,
    rebound_DA: 0,
    rebound_OB: 0,
    rebound_DB: 0,
    bs_A: 0,
    bs_B: 0,
    to_A: 0,
    to_B: 0
}

export const InitialQuarter: Quarter = {
    point: [],
    parameter: InitialParameter
}

export const InitialGame: Game = {
    year: 1990,
    month: 1,
    day: 1,
    team_A: "",
    team_B: "",
    Q1: InitialQuarter,
    Q2: InitialQuarter,
    Q3: InitialQuarter,
    Q4: InitialQuarter
}

export const TestGame: Game = {
    year: 2022,
    month: 6,
    day: 6,
    team_A: "A",
    team_B: "B",
    Q1: InitialQuarter,
    Q2: InitialQuarter,
    Q3: InitialQuarter,
    Q4: InitialQuarter
}
