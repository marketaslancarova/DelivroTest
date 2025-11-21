


# DelivroTest – Docker Setup (Backend + Frontend + DB + MinIO)

Projekt obsahuje:

- backend (Node.js + Express + Prisma)  
- frontend (Next.js)  
- PostgreSQL databázi  
- MinIO (S3-like úložiště pro soubory)



## Spuštění projektu

Je potřeba mít nainstalovaný Docker Desktop:  

### Následně spuštění jedním příkazem:

```bash
git clone https://github.com/marketaslancarova/DelivroTest.git
cd DelivroTest
docker compose up --build
````



## Po spuštění běží

| Služba        | URL                                            |
| ------------- | ---------------------------------------------- |
| Frontend      | [http://localhost:3000](http://localhost:3000) |
| Backend API   | [http://localhost:4000](http://localhost:4000) |
| MinIO UI      | [http://localhost:9001](http://localhost:9001) |
| PostgreSQL DB | [http://localhost:5432](http://localhost:5432) |



## Přihlašovací údaje – PostgreSQL

| Klíč     | Hodnota     |
| -------- | ----------- |
| Host     | `localhost` |
| Port     | `5432`      |
| Database | `delivro`   |
| User     | `postgres`  |
| Password | `postgres`  |

## Přihlašovací údaje – MinIO

| Klíč       | Hodnota                 |
| ---------- | ----------------------- |
| URL        | `http://localhost:9001` |
| User       | `minio`                 |
| Password   | `minio12345`            |
| Bucket     | `invoices`              |

