---
title: "The ultimate cheatsheet to TypeScript's type system."
category: "typescript"
created: 2025-03-20
thumbnail: test-code.webp
summary: "Did you know that TypeScript's type system is Turing complete?"
published: false
---
# The basics
TypeScript has a structural type system. This means that types do not classify values into different "buckets", but instead describe what these values contain. This model is often summed up as "if it looks like a duck, it's a duck". In a structural type system, something is a `Dog` if it has the fields `name`, `age` and `breed`. You don't care if that something was explicitly called a `Dog` when it was created, you care that it has the properties you expect dogs to have. If I want to pass my `Cat` `whiskers`, who also has a `name`, an `age` and a `breed` to a function expecting a `Dog` here, it's fine - the function doesn't judge `whiskers` by its labels, it judges it by what it can do.

# Mapping fields
TypeScript allows us to create a new type whose fields are derived from those that exist in another type, but changing their type:

Imagine we have a type `Person`, described like this:

```ts filename="mapping.ts"
interface Person {
    name: string,
    age: number,
    country: string,
    hasJob?: boolean,
}
```

We can create a new class that contains all the fields `Person` does, but all of them being `boolean`

```ts filename="mapping.ts"
type PersonFields {
    [K in keyof Person]: boolean;
}
```

This new type contains four fields: `name`, `age`, `country` and `hasJob`, just like `Person` does; but all of them are `boolean` - except for `hasJob`, which preserves it's optionality and thus has the type `boolean | undefined`.

TypeScript actually defines a few of these mapping types that you can use for common transformations:

```ts filename="mapping.ts"
// Make everything required:
type RequiredPerson = Required<Person>; // here 'hasJob' is no longer optional.

// Make everything optional:
type OptionalPerson = Optional<Person>; // here 'name' (and others) are optional.
```