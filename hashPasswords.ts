import Database from "better-sqlite3";
import bcrypt from "bcrypt";

const db = new Database("placestostay.db");

async function hashPasswords() {
    const users = db.prepare("SELECT * FROM acc_users").all() as { ID: number, username: string, password: string }[];

    for (const user of users) {
        const hashed = await bcrypt.hash(user.password, 10);
        db.prepare("UPDATE acc_users SET password = ? WHERE ID = ?").run(hashed, user.ID);
        console.log(`Hashed password for ${user.username}`);
    }

    console.log("Done!");
}

hashPasswords();
