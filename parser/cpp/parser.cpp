#include "iostream"
#include "string"
#include "node.h"

using namespace std;

namespace data2graphics
{

    using v8::Exception;
    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::FunctionTemplate;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Array;
    using v8::Object;
    using v8::String;
    using v8::Value;

    struct Antibiotics
    {
        Local<Array> arr1;
        Local<Array> arr2;
        Local<Array> arr3;
        Local<Array> arr4;
        Local<Array> arr5;
        Local<Array> arr6;
        Local<Array> arr7;
        Local<Array> arr8;
        Local<Array> arr9;
        Local<Array> arr10;
        Local<Array> arr11;
        Local<Array> arr12;
        Local<Array> arr13;
        Local<Array> arr14;
        Local<Array> arr15;
    };


    void Parse(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();
        Local<Object> obj = Object::New(isolate);

        obj->Set(String::NewFromUtf8(isolate, "top"), args[0]->ToString());
        obj->Set(String::NewFromUtf8(isolate, "bottom"), args[0]->ToString());
        obj->Set(String::NewFromUtf8(isolate, "gap"), args[0]->ToString());



        cout << args.Length();

        args.GetReturnValue().Set(obj);
    }

    void init(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "parse", Parse);
    }



    NODE_MODULE(parser, init);

}
