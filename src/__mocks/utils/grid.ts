import { IManagedObject } from '@c8y/client';

/** Defines possible filter types extracted from the query */
interface QueryFilters {
  name?: string;
  id?: string;
  hasEntries: string[];
  typesEntries: string[];
}

/**
 * Parse query and returns filters
 */
function parseQuery(query: string): QueryFilters {
  return {
    name: extractFromQuery(query, /name eq '\*([^*]+)\*'/),
    id: extractFromQuery(query, /id eq '\*([^*]+)\*'/),
    hasEntries: extractMultipleFromQuery(query, /has\(([^)]+)\)/g),
    typesEntries: extractMultipleFromQuery(query, /type eq '([^']+)'/g)
  };
}

/**
 * Extracts a single match from query using provided regex pattern
 */
function extractFromQuery(query: string, pattern: RegExp): string | undefined {
  const match = pattern.exec(query);
  return match ? match[1] : undefined;
}

/**
 * Extracts all matches from query using provided regex pattern
 */
function extractMultipleFromQuery(query: string, pattern: RegExp): string[] {
  let match;
  const results = [];
  while ((match = pattern.exec(query)) !== null) {
    results.push(match[1]);
  }
  return results;
}

/**
 * Filters objects based on provided filters
 */
export function filterObjects(objects: IManagedObject[], query: string): IManagedObject[] {
  const isEmptyQuery = /"query":"\s*"/.test(query);
  if (isEmptyQuery) {
    return objects;
  }
  const filters = parseQuery(query);
  return objects.filter(
    object =>
      filterByName(object, filters.name) &&
      filterById(object, filters.id) &&
      filterByProperties(object, filters.hasEntries) &&
      filterByType(object, filters.typesEntries)
  );
}

/**
 * Filters objects based on the provided search text
 */
export function filterObjectBySearchText(objects: IManagedObject[], query: string) {
  const regex = /"text":"(.*?)"/;
  const match = query.match(regex);

  if (match) {
    const textValue = match[1];
    return objects.filter(object => filterByName(object, textValue));
  }
  return objects;
}

/**
 * Filters object by name
 */
function filterByName(object: IManagedObject, name?: string): boolean {
  return name ? object.name.includes(name) : true;
}

/**
 * Filters object by id
 */
function filterById(object: IManagedObject, id?: string): boolean {
  return id ? object.id.includes(id) : true;
}

/**
 * Filters object by existence of certain properties
 */
function filterByProperties(object: IManagedObject, properties: string[]): boolean {
  return properties.length > 0 ? properties.some(prop => object.hasOwnProperty(prop)) : true;
}

/**
 * Filters object by type
 */
function filterByType(object: IManagedObject, types: string[]): boolean {
  return types.length > 0 ? types.some(type => object.type.includes(type.replace('*', ''))) : true;
}
