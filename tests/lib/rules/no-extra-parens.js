/**
 * @fileoverview Disallow parenthesesisng higher precedence subexpressions.
 * @author Michael Ficarra
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslintTester = require("../../../lib/tests/eslintTester");

function invalid(code, type) {
    return { code: code, errors: [{ message: "Gratuitous parentheses around expression.", type: type }] };
}

eslintTester.addRuleTest("no-extra-parens", {
    valid: [
        // all precedence boundaries
        "a = b, c = d",
        "a = b ? c : d",
        "a = (b, c)",
        "a || b ? c = d : e = f",
        "(a = b) ? (c, d) : (e, f)",
        "a && b || c && d",
        "(a ? b : c) || (d ? e : f)",
        "a | b && c | d",
        "(a || b) && (c || d)",
        "a ^ b | c ^ d",
        "(a && b) | (c && d)",
        "a & b ^ c & d",
        "(a | b) ^ (c | d)",
        "a == b & c != d",
        "(a ^ b) & (c ^ d)",
        "a < b === c in d",
        "(a & b) !== (c & d)",
        "a << b >= c >>> d",
        "(a == b) instanceof (c != d)",
        "a + b << c - d",
        "(a <= b) >> (c > d)",
        "a * b + c / d",
        "(a << b) - (c >> d)",
        "+a % !b",
        "(a + b) * (c - d)",
        "-void+delete~typeof!a",
        "!(a * b); typeof (a / b); +(a % b); delete (a * b); ~(a / b); void (a % b); -(a * b)",
        "a(b = c, (d, e))",
        "(++a)(b); (c++)(d);",
        "new (A())",
        "new A()()",

        // same precedence
        "a, b, c",
        "a = b = c",
        "a ? b ? c : d : e",
        "a ? b : c ? d : e",
        "a || b || c",
        "a || (b || c)",
        "a && b && c",
        "a && (b && c)",
        "a | b | c",
        "a | (b | c)",
        "a ^ b ^ c",
        "a ^ (b ^ c)",
        "a & b & c",
        "a & (b & c)",
        "a == b == c",
        "a == (b == c)",
        "a < b < c",
        "a < (b < c)",
        "a << b << c",
        "a << (b << c)",
        "a + b + c",
        "a + (b + c)",
        "a * b * c",
        "a * (b * c)",
        "!!a; typeof +b; void -c; ~delete d;",
        "a(b)",
        "a(b)(c)",
        "a((b, c))",
        "new new A",

        // constructs that contain expressions
        "if(a);",
        "with(a){}",
        "switch(a){ case 0: break; }",
        "function a(){ return b; }",
        "throw a;",
        "while(a);",
        "do; while(a);",
        "for(;;);",
        "for(a in b);",
        "var a = (b, c);",
        "[]",
        "[a, b]",
        "!{a: 0, b: 1}",

        // special cases
        "(a + b) * (c + d) == e",
        "(0).a",
        "(function(){ }())",
        "({a: function(){}}.a());",
        "({a:0}.a ? b : c)"
    ],
    invalid: [
        invalid("(0)", "Literal"),
        invalid("(  0  )", "Literal"),
        invalid("if((0));", "Literal"),
        invalid("if(( 0 ));", "Literal"),
        invalid("with((0)){}", "Literal"),
        invalid("switch((0)){}", "Literal"),
        invalid("switch(0){ case (1): break; }", "Literal"),
        invalid("for((0);;);", "Literal"),
        invalid("for(;(0););", "Literal"),
        invalid("for(;;(0));", "Literal"),
        invalid("throw(0)", "Literal"),
        invalid("while((0));", "Literal"),
        invalid("do; while((0))", "Literal"),
        invalid("for(a in (0));", "Literal"),
        invalid("f((0))", "Literal"),
        invalid("f(0, (1))", "Literal"),
        invalid("!(0)", "Literal"),
        invalid("(a)(b)", "Identifier"),
        invalid("(a, b)", "SequenceExpression"),
        invalid("var a = (b = c);", "AssignmentExpression"),
        invalid("function f(){ return (a); }", "Identifier"),
        invalid("[a, (b = c)]", "AssignmentExpression"),
        invalid("!{a: (b = c)}", "AssignmentExpression"),
        invalid("typeof(0)", "Literal"),
        invalid("(a || b) ? c : d", "LogicalExpression"),
        invalid("a ? (b = c) : d", "AssignmentExpression"),
        invalid("a ? b : (c = d)", "AssignmentExpression"),
        invalid("f((a = b))", "AssignmentExpression"),
        invalid("a, (b = c)", "AssignmentExpression"),
        invalid("a = (b * c)", "BinaryExpression"),
        invalid("a + (b * c)", "BinaryExpression"),
        invalid("(a * b) + c", "BinaryExpression"),
        invalid("(a * b) / c", "BinaryExpression"),
        invalid("a = (b = c)", "AssignmentExpression"),
        invalid("(a).b", "Identifier"),
        invalid("(0)[a]", "Literal"),
        invalid("(0.0).a", "Literal"),
        invalid("(0xBEEF).a", "Literal"),
        invalid("(1e6).a", "Literal")
    ]
});
