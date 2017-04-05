#include "iostream"
#include "string"
#include "verctor"
#include "v8.h"

using namespace v8;
using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;



verctor<int> main(){

}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}



NODE_MODULE(parser, init);