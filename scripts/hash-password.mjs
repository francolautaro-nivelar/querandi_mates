import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Uso: node scripts/hash-password.mjs \"tu-contraseña\"");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

console.log("\nCopiá este valor como la variable de entorno ADMIN_PASSWORD_HASH en Vercel:\n");
console.log(hash);
console.log(
  "\nSi además la probás en .env.local en tu máquina, escapá cada '$' como '\\$'" +
    " (Next corta el valor si no lo hacés). En el dashboard de Vercel pegala tal cual, sin escapar.\n"
);
