%{
    #include <stdlib.h>
    #include <stdio.h>
    #include "parser.hpp"

    extern int yylex();
%}

%option noyywrap
%option case-insensitive

/* Regular expressions for S-expression tokens */
DIGIT        [0-9]
ALPHA        [a-zA-Z]
WHITESPACE   [ \t\r\n]
NONWS        [^ \t\r\n\(\)\"]
INT          [+-]?[0-9]+
DOUBLE       [+-]?[0-9]+(\.[0-9]*)?([eE][+-]?[0-9]+)?
ESCSEQ       \\(["\\]|n|r|x[0-9a-fA-F]{2}|[0-7]{1,3}) /* Escape sequences */


%%

"("                 {   yylval.sval = yytext; 
                        return OPEN_PAREN;  
                    }

")"                 {   yylval.sval = yytext;
                        return CLOSE_PAREN; 
                    }

\"([^\"\\]|\\.)*\"  {   yylval.sval = yytext;
                        return QUOTED;
                    }

{INT}               {   yylval.sval = yytext;
                        return INT;
                    }

{DOUBLE}            {   yylval.sval = yytext;
                        return DOUBLE;
                    }

{NONWS}+            {   yylval.sval = yytext;
                        return VALUE;
                    }

{WHITESPACE}+       {
                        /* Ignore whitespace */
                    }

"#"[^\n]*           {
                        /* skip comment entirely, or you could track it if desired */
                    }

.                   {
                        fprintf(stderr, "UNRECOGNIZED: %s\n", yytext);
                    }

%%