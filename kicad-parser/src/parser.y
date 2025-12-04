
%{
    #include <stdio.h>
    #include <stdlib.h>
    #include <cstdlib>
    #include "sexpr.hpp"
    
    extern char* yytext;
    sexpr::Node* root = nullptr;
    
%}

%code requires {
    #include <cstdio>
    #include <string>
    #include <memory>
    #include "sexpr.hpp"

    sexpr::Node* GetRoot();
    extern int yylex(void);
    static void yyerror(const char* s); 
}

%union {
    char* sval; 
    sexpr::Node* node; // For AST nodes
}

%token <sval> OPEN_PAREN
%token <sval> CLOSE_PAREN
%token <sval> QUOTED
%token <sval> VALUE INT DOUBLE

%type <node> sexpr sx atom file

%start file

%%

file 
    : sexpr
      {
        root = $1;
      }
    ;
sexpr
    : OPEN_PAREN sx CLOSE_PAREN
      {
        $$ = $2;
      }
    ;

sx
    : sx atom
      {
       $1->AddChild($2);
       $$ = $1;
      }
    | sx sexpr
      {
        $1->AddChild($2);
        $$ = $1;  
      }
    | 
      {
        $$ = new sexpr::NodeList();
      }
    ;

atom
    : QUOTED
      {
       $$ = new sexpr::NodeString($1);
      }
    | INT
      {
        long long int val=atoll($1);
        $$ = new sexpr::NodeInteger(val);
      }
    | DOUBLE
      {
        const char* value_in_string=$1;
        $$ = new sexpr::NodeDouble(std::stod(value_in_string));
      }
    | VALUE
      {
        $$ = new sexpr::NodeSymbol($1);
      }
    ;
%%

/*
Function prints error code to stderr
*/

void yyerror(const char *s){
    fprintf(stderr, "error: %s\n", s);
}

sexpr::Node* GetRoot(){
    return root;
}
