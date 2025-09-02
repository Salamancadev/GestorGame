# GestorGame
Gestor de misiones de videojuegos
¿Qué es TypeScript y en qué se diferencia de JavaScript?
TypeScript es un superconjunto de JavaScript que añade tipado estático y herramientas de desarrollo, lo que permite detectar errores antes de ejecutar el código.

¿Qué ventajas ofrece TypeScript para trabajar con POO?
Facilita la creación de clases, interfaces y herencia con seguridad de tipos, haciendo que el código sea más mantenible y escalable.

¿Qué son los modificadores de acceso (public, private, protected)? Ejemplos.
Son reglas de visibilidad: public (acceso desde cualquier lugar), private (solo dentro de la clase) y protected (en la clase y sus hijas).
Ejemplo: class C{ public x=1; private y=2; protected z=3 }.

¿Qué es un readonly y para qué se usa?
Es un modificador que hace inmutable una propiedad después de su inicialización.
Ejemplo: class U{ readonly id:number=1 }.

¿Cómo se definen clases y objetos en TS?
Se usa class para definir una plantilla y new para crear instancias.
Ejemplo: class Persona{}; const p=new Persona();.

¿Qué son los constructores y para qué sirven?
Son métodos especiales que inicializan los atributos al crear un objeto.
Ejemplo: class P{ constructor(public nombre:string){} }.

¿Qué es la herencia en TS y cómo se implementa (extends / super)?
Es el mecanismo para reutilizar código de otra clase, usando extends y super.
Ejemplo: class Estudiante extends P{ constructor(n:string){ super(n) } }.

¿Qué significa polimorfismo en el contexto de TS?
Es la capacidad de usar una misma interfaz o método en diferentes formas según el objeto.
Ejemplo: function hablar(a:Animal){ a.sonido() }.

¿Qué son las clases abstractas y qué diferencia tienen con una clase normal?
Son clases que no se pueden instanciar y sirven como base con métodos abstractos que deben implementarse.
Ejemplo: abstract class Figura{ abstract area():number }.

¿Qué es una interface en TS y en qué se diferencia de una clase abstracta?
Una interface define contratos sin lógica, mientras que la abstracta puede contener código común además de métodos abstractos.
Ejemplo: interface Serializa{ toJSON():string }.

Ejemplo mínimo de cada pilar de POO en TS (una línea de código por concepto).

Encapsulación: private saldo:number;

Abstracción: interface Repo{save():void}

Herencia: class Hijo extends Padre{}

Polimorfismo: function f(a:Animal){a.hablar()}

Investigar y realizar la configuración de TypeScript con Node JS y VS Code.
Se configura con: npm init -y && npm i -D typescript ts-node @types/node && npx tsc --init; en tsconfig.json define "rootDir":"src","outDir":"dist", crea src/index.ts, y en VS Code instala la extensión oficial de TypeScript.
