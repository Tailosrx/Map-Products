# 📌 Instalación de la Base de Datos Northwind en PostgreSQL

## 📂 Ubicación del archivo SQL
El archivo de la base de datos `northwind.sql` se encuentra en el siguiente directorio dentro del repositorio:

📁 docs/ └── 📁 database/ └── northwind.postgre.sql

---

## 🛠️ Pasos para la instalación

1. **Abrir pgAdmin**  
   - Inicia **pgAdmin** y conéctate a tu servidor PostgreSQL.

2. **Crear una nueva base de datos** *(opcional, si no la tienes ya creada)*  
   - En el panel izquierdo, haz clic derecho en `Bases de datos` → `Crear` → `Base de datos...`
   - Nombre: `northwind`
   - Clic en **Guardar**.

3. **Cargar el script SQL**  
   - Abre una nueva consulta en **pgAdmin**.
   - Copia y pega el contenido del archivo `northwind.sql`.

4. **Ejecutar el código**  
   - Presiona el botón ▶️ (**Ejecutar / Run**) para ejecutar el script.
---

## ✅ Verificación

Para comprobar que la instalación fue exitosa, puedes ejecutar la siguiente consulta en la base de datos:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```