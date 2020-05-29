/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-plugin-rxjs
 */

import { stripIndent } from "common-tags";
import rule = require("../../source/rules/suffix-subjects");
import { ruleTester } from "../utils";

ruleTester({ types: true }).run("suffix-subjects", rule, {
  valid: [
    {
      code: stripIndent`
      // with default suffix
      import { Subject } from "rxjs";

      const subject = new Subject<any>();
      const someSubject = new Subject<any>();

      const someObject = {
        subject: new Subject<any>(),
        someSubject: new Subject<any>()
      };

      function someFunction(
        subject: Subject<any>,
        someSubject: Subject<any>
      ) {
        console.log(subject, someSubject);
      }

      class SomeClass {
        subject = new Subject<any>();
        someSubject = new Subject<void>();

        constructor(private ctorSubject: Subject<any>) {}

        someMethod(someSubject: Subject<any>): Subject<any> {
          return someSubject;
        }

        get anotherSubject(): Subject<any> {
          return this.subject;
        }
        set anotherSubject(someSubject: Subject<any>) {
          this.someSubject = someSubject;
        }
      }

      interface SomeInterface {
        subject: Subject<any>;
        someSubject: Subject<any>;
        someMethod(someSubject: Subject<any>): Subject<any>;
      }
    `,
      options: [{}],
    },
    {
      code: stripIndent`
      // with default suffix and $
      import { Subject } from "rxjs";

      const subject$ = new Subject<any>();
      const someSubject$ = new Subject<any>();

      const someObject = {
        subject$: new Subject<any>(),
        someSubject$: new Subject<any>()
      };

      function someFunction(
        subject$: Subject<any>,
        someSubject$: Subject<any>
      ) {
        console.log(subject$, someSubject$);
      }

      class SomeClass {
        subject$ = new Subject<any>();
        someSubject$ = new Subject<void>();

        constructor(private ctorSubject$: Subject<any>) {}

        someMethod(someSubject$: Subject<any>): Subject<any> {
          return someSubject$;
        }

        get anotherSubject$(): Subject<any> {
          return this.subject$;
        }
        set anotherSubject$(someSubject$: Subject<any>) {
          this.someSubject$ = someSubject$;
        }
      }

      interface SomeInterface {
        subject$: Subject<any>;
        someSubject$: Subject<any>;
        someMethod(someSubject$: Subject<any>): Subject<any>;
      }
    `,
      options: [{}],
    },
    {
      code: stripIndent`
      // with explicit suffix
      import { Subject } from "rxjs";

      const sub = new Subject<any>();
      const someSub = new Subject<any>();

      const someObject = {
        sub: new Subject<any>(),
        someSub: new Subject<any>()
      };

      function someFunction(
        sub: Subject<any>,
        someSub: Subject<any>
      ) {
        console.log(sub, someSub);
      }

      class SomeClass {
        sub = new Subject<any>();
        someSub = new Subject<void>();

        constructor(private ctorSub: Subject<any>) {}

        someMethod(someSub: Subject<any>): Subject<any> {
          return someSub;
        }

        get anotherSub(): Subject<any> {
          return this.sub;
        }
        set anotherSub(someSub: Subject<any>) {
          this.someSub = someSub;
        }
      }

      interface SomeInterface {
        sub: Subject<any>;
        someSub: Subject<any>;
        someMethod(someSub: Subject<any>): Subject<any>;
      }
    `,
      options: [{ suffix: "Sub" }],
    },
    {
      code: stripIndent`
      // with explicit suffix and $
      import { Subject } from "rxjs";

      const sub$ = new Subject<any>();
      const someSub$ = new Subject<any>();

      const someObject = {
        sub$: new Subject<any>(),
        someSub$: new Subject<any>()
      };

      function someFunction(
        sub$: Subject<any>,
        someSub$: Subject<any>
      ) {
        console.log(sub$, someSub$);
      }

      class SomeClass {
        sub$ = new Subject<any>();
        someSub$ = new Subject<void>();

        constructor(private ctorSub$: Subject<any>) {}

        someMethod(someSub$: Subject<any>): Subject<any> {
          return someSub$;
        }

        get anotherSub$(): Subject<any> {
          return this.sub$;
        }
        set anotherSub$(someSub$: Subject<any>) {
          this.someSub$ = someSub$;
        }
      }

      interface SomeInterface {
        sub$: Subject<any>;
        someSub$: Subject<any>;
        someMethod(someSub$: Subject<any>): Subject<any>;
      }
    `,
      options: [{ suffix: "Sub" }],
    },
    {
      code: stripIndent`
      // with EventEmitter
      import { Subject } from "rxjs";

      class EventEmitter<T> extends Subject<T> {}
      const emitter = new EventEmitter<any>();
    `,
      options: [{}],
    },
    {
      code: stripIndent`
      // with explicit non-enforced type
      import { Subject } from "rxjs";

      class Thing<T> extends Subject<T> {}
      const thing = new Thing<any>();
    `,
      options: [
        {
          types: {
            "^Thing$": false,
          },
        },
      ],
    },
  ],
  invalid: [
    {
      code: stripIndent`
        // parameters without suffix
        import { Subject } from "rxjs";

        function someFunction(
          one: Subject<any>,
          some: Subject<any>
        ) {
          console.log(one, some);
        }

        class SomeClass {
          constructor(ctor: Subject<any>) {}

          someMethod(some: Subject<any>): Subject<any> {
            return some;
          }

          get another(): Subject<any> {
            return this.ctor;
          }
          set another(some: Subject<any>) {
            this.ctor = some;
          }
        }

        interface SomeInterface {
          someMethod(some: Subject<any>): Subject<any>;
        }
      `,
      errors: [
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 6,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 6,
          column: 3,
          endLine: 6,
          endColumn: 7,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 12,
          column: 15,
          endLine: 12,
          endColumn: 19,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 14,
          column: 14,
          endLine: 14,
          endColumn: 18,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 18,
          column: 7,
          endLine: 18,
          endColumn: 14,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 21,
          column: 7,
          endLine: 21,
          endColumn: 14,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 21,
          column: 15,
          endLine: 21,
          endColumn: 19,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 27,
          column: 14,
          endLine: 27,
          endColumn: 18,
        },
      ],
      options: [{}],
    },
    {
      code: stripIndent`
        // parameters without suffix, but not enforced
        import { Subject } from "rxjs";

        function someFunction(
          one: Subject<any>,
          some: Subject<any>
        ) {
          console.log(one, some);
        }

        class SomeClass {
          constructor(ctor: Subject<any>) {}

          someMethod(some: Subject<any>): Subject<any> {
            return some;
          }

          get another(): Subject<any> {
            return this.ctor;
          }
          set another(some: Subject<any>) {
            this.ctor = some;
          }
        }

        interface SomeInterface {
          someMethod(some: Subject<any>): Subject<any>;
        }
      `,
      errors: [
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 18,
          column: 7,
          endLine: 18,
          endColumn: 14,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 21,
          column: 7,
          endLine: 21,
          endColumn: 14,
        },
      ],
      options: [{ parameters: false }],
    },
    {
      code: stripIndent`
        // parameters without explicit suffix
        import { Subject } from "rxjs";

        function someFunction(
          one: Subject<any>,
          some: Subject<any>
        ) {
          console.log(one, some);
        }

        class SomeClass {
          constructor(ctor: Subject<any>) {}

          someMethod(some: Subject<any>): Subject<any> {
            return some;
          }

          get another(): Subject<any> {
            return this.ctor;
          }
          set another(some: Subject<any>) {
            this.ctor = some;
          }
        }

        interface SomeInterface {
          someMethod(some: Subject<any>): Subject<any>;
        }
      `,
      errors: [
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 6,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 6,
          column: 3,
          endLine: 6,
          endColumn: 7,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 12,
          column: 15,
          endLine: 12,
          endColumn: 19,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 14,
          column: 14,
          endLine: 14,
          endColumn: 18,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 18,
          column: 7,
          endLine: 18,
          endColumn: 14,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 21,
          column: 7,
          endLine: 21,
          endColumn: 14,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 21,
          column: 15,
          endLine: 21,
          endColumn: 19,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 27,
          column: 14,
          endLine: 27,
          endColumn: 18,
        },
      ],
      options: [{ suffix: "Sub" }],
    },
    {
      code: stripIndent`
        // properties without suffix
        import { Subject } from "rxjs";

        const someObject = {
          one: new Subject<any>(),
          some: new Subject<any>()
        };

        class SomeClass {
          one = new Subject<any>();
          some = new Subject<void>();

          get another(): Subject<any> {
            return this.subject;
          }
          set another(some: Subject<any>) {
            this.some = some;
          }
        }

        interface SomeInterface {
          one: Subject<any>;
          some: Subject<any>;
        }
      `,
      errors: [
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 6,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 6,
          column: 3,
          endLine: 6,
          endColumn: 7,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 10,
          column: 3,
          endLine: 10,
          endColumn: 6,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 11,
          column: 3,
          endLine: 11,
          endColumn: 7,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 13,
          column: 7,
          endLine: 13,
          endColumn: 14,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 16,
          column: 7,
          endLine: 16,
          endColumn: 14,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 16,
          column: 15,
          endLine: 16,
          endColumn: 19,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 22,
          column: 3,
          endLine: 22,
          endColumn: 6,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 23,
          column: 3,
          endLine: 23,
          endColumn: 7,
        },
      ],
      options: [{}],
    },
    {
      code: stripIndent`
        // properties without suffix, but not enforced
        import { Subject } from "rxjs";

        const someObject = {
          one: new Subject<any>(),
          some: new Subject<any>()
        };

        class SomeClass {
          one = new Subject<any>();
          some = new Subject<void>();

          get another(): Subject<any> {
            return this.subject;
          }
          set another(some: Subject<any>) {
            this.some = some;
          }
        }

        interface SomeInterface {
          one: Subject<any>;
          some: Subject<any>;
        }
      `,
      errors: [
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 16,
          column: 15,
          endLine: 16,
          endColumn: 19,
        },
      ],
      options: [{ properties: false }],
    },
    {
      code: stripIndent`
        // properties without explicit suffix
        import { Subject } from "rxjs";

        const someObject = {
          one: new Subject<any>(),
          some: new Subject<any>()
        };

        class SomeClass {
          one = new Subject<any>();
          some = new Subject<void>();

          get another(): Subject<any> {
            return this.subject;
          }
          set another(some: Subject<any>) {
            this.some = some;
          }
        }

        interface SomeInterface {
          one: Subject<any>;
          some: Subject<any>;
        }
      `,
      errors: [
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 6,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 6,
          column: 3,
          endLine: 6,
          endColumn: 7,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 10,
          column: 3,
          endLine: 10,
          endColumn: 6,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 11,
          column: 3,
          endLine: 11,
          endColumn: 7,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 13,
          column: 7,
          endLine: 13,
          endColumn: 14,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 16,
          column: 7,
          endLine: 16,
          endColumn: 14,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 16,
          column: 15,
          endLine: 16,
          endColumn: 19,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 22,
          column: 3,
          endLine: 22,
          endColumn: 6,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 23,
          column: 3,
          endLine: 23,
          endColumn: 7,
        },
      ],
      options: [{ suffix: "Sub" }],
    },
    {
      code: stripIndent`
        // variables without suffix
        import { Subject } from "rxjs";

        const one = new Subject<any>();
        const some = new Subject<any>();
      `,
      errors: [
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 4,
          column: 7,
          endLine: 4,
          endColumn: 10,
        },
        {
          data: { suffix: "Subject" },
          messageId: "forbidden",
          line: 5,
          column: 7,
          endLine: 5,
          endColumn: 11,
        },
      ],
      options: [{}],
    },
    {
      code: stripIndent`
        // variables without suffix, but not enforced
        import { Subject } from "rxjs";

        const one = new Subject<any>();
        const some = new Subject<any>();
      `,
      errors: [],
      options: [{ variables: false }],
    },
    {
      code: stripIndent`
        // variables without explicit suffix
        import { Subject } from "rxjs";

        const one = new Subject<any>();
        const some = new Subject<any>();
      `,
      errors: [
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 4,
          column: 7,
          endLine: 4,
          endColumn: 10,
        },
        {
          data: { suffix: "Sub" },
          messageId: "forbidden",
          line: 5,
          column: 7,
          endLine: 5,
          endColumn: 11,
        },
      ],
      options: [{ suffix: "Sub" }],
    },
  ],
});