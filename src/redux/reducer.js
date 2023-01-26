import auth from './branches/auth';
import db from './branches/db';

const initState = {
    unique_string: "bruhhh",
    is_signed: false,
    credential: {},
    currentTable: { fields: [] }
}

export default ( state = initState, action ) => {
    switch (action.branch) {

        case "db":
            return db(state, action)
            break;

        default:
            return auth(state, action);
    }
}
